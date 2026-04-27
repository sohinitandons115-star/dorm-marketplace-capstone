/* Example Item Structure
{
  id: "uuid-123",
  name: "Pizza",
  totalQty: 100,
  claimedQty: 0, // Currently being eaten
  status: "available" 
}
*/

// Define items array
const items = [
  {
    id: "uuid-123",
    name: "Pizza",
    totalQty: 100,
    claimedQty: 0,
    status: "available"
  }
];

// Scenario 1 Logic
const handleRequest = (itemId, amount) => {
  const item = items.find(i => i.id === itemId);
  const available = item.totalQty - item.claimedQty;
  
  if (amount <= available) {
    // Process Request
    console.log(`Request processed for ${amount} of ${item.name}`);
  } else {
    console.log("Not enough left!");
  }
};

// Test the function
handleRequest("uuid-123", 50); // Should work
handleRequest("uuid-123", 150); // Should fail