// Data structure for our network
let nodes = [];
let segments = [];
// --- SIMULATION PARAMETERS ---
// The maximum number of nodes to prevent the simulation from getting too slow
const maxNodes = 250;
// The chance (out of 1.0) that a new branch will be created each frame
const growthChance = 0.025;
// How much each segment's desired length increases per frame
const growthRate = 0.1;
// The initial length of a newly created branch
const initialBranchLength = 1;
// Multiplier for node size, based on connected segment length
const nodeSizeMultiplier = 1.5;
// Physics forces
const repulsionForce = 0.6;
const attractionForce = 0.1;
const physicsIterations = 4;
// --- A class for a single node in our network ---
class Node {
constructor(x, y) {
this.pos = createVector(x, y);
this.radius = 5; // Will be updated dynamically
}
}
// --- A class for a connection between two nodes ---
class Segment {
constructor(nodeA, nodeB) {
this.nodeA = nodeA;
this.nodeB = nodeB;
// The "ideal" length of this segment, which will grow over time
this.desiredLength = p5.Vector.dist(nodeA.pos, nodeB.pos);
}
}
function setup() {
createCanvas(windowWidth, windowHeight);
initialize();
}
function initialize() {
// Clear the network
nodes = [];
segments = [];
// Create the "seed" of our structure: two nodes connected by one segment
let center = createVector(width / 2, height / 2);
let node1 = new Node(center.x - initialBranchLength/2, center.y);
let node2 = new Node(center.x + initialBranchLength/2, center.y);
nodes.push(node1);
nodes.push(node2);
segments.push(new Segment(node1, node2));
}
function draw() {
background(15, 18, 20); // Very dark background
// --- 1. GROWTH ---
// a) Elongation: Increase the desired length of all existing segments
for (let seg of segments) {
seg.desiredLength += growthRate;
}
// b) Branching: Sometimes, add a new branch
if (random(1) < growthChance && nodes.length < maxNodes) {
// Pick a random existing node to branch from
let parentNode = random(nodes);
// Create a new node at a random direction away from the parent
let angle = random(TWO
_
PI);
let newPos = p5.Vector.fromAngle(angle, initialBranchLength).add(parentNode.pos);
let childNode = new Node(newPos.x, newPos.y);
// Add the new node and the connecting segment to our lists
nodes.push(childNode);
segments.push(new Segment(parentNode, childNode));
}
// c) Update node radii based on their connections
for (let node of nodes) {
let totalLength = 0;
let connections = 0;
// Find all segments connected to this node
for (let seg of segments) {
if (seg.nodeA === node || seg.nodeB === node) {
totalLength += seg.desiredLength;
connections++;
}
}
if (connections > 0) {
let avgLength = totalLength / connections;
node.radius = max(2, avgLength * nodeSizeMultiplier);
}
}
// --- 2. PHYSICS ---
for (let i = 0; i < physicsIterations; i++) {
// a) Attraction (along segments)
for (let seg of segments) {
let delta = p5.Vector.sub(seg.nodeB.pos, seg.nodeA.pos);
let dist = delta.mag();
let diff = seg.desiredLength - dist;
let correction = delta.copy().setMag(diff * 0.5 * attractionForce);
seg.nodeA.pos.sub(correction);
seg.nodeB.pos.add(correction);
}
// b) Repulsion (between all nodes)
for (let j = 0; j < nodes.length; j++) {
for (let k = j + 1; k < nodes.length; k++) {
let n1 = nodes[j];
let n2 = nodes[k];
let delta = p5.Vector.sub(n2.pos, n1.pos);
let dist = delta.mag();
// The minimum distance is the sum of their radii
let min
dist = n1.radius + n2.radius;_
if (dist < min
_
dist) {
let diff = min
dist - dist;
_
let correction = delta.copy().setMag(diff * 0.5 * repulsionForce);
n1.pos.sub(correction);
n2.pos.add(correction);
}
}
}
}
// --- 3. DRAWING ---
// Draw the segments (lines)
stroke(180, 180, 190, 150); // Translucent, silvery-white
strokeWeight(2);
for (let seg of segments) {
line(seg.nodeA.pos.x, seg.nodeA.pos.y, seg.nodeB.pos.x, seg.nodeB.pos.y);
}
// Draw the nodes on top
noStroke();
fill(210, 210, 220); // Brighter, solid silver
for (let node of nodes) {
circle(node.pos.x, node.pos.y, node.radius * 2);
}
// Click to restart
function mousePressed() {
initialize();
}
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
initialize();
}
  
