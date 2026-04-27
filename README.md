# FridgePolice Implementation Report

## Project Overview
FridgePolice is a resilient state-management prototype designed to handle the "messy" reality of shared living. Built with React and LocalState, it prioritizes data integrity over the "happy path."

## Scenario Handling

### 1. Concurrency Collision (The 25% Pizza)
**Logic:** I implemented a validation check that runs at the exact moment of the "Request" and "Approval" actions. 
- **Rule:** A request is rejected if `Remaining_Quantity - Pending_Requests < Requested_Amount`. 
- **Result:** Only one roommate can successfully claim the last 25% of the pizza; the second receives a "Quantity Unavailable" error.

### 2. The Spoilage Ghost (Stale Approvals)
**Logic:** Every "Approved" portion is assigned a `timestamp`. 
- **Rule:** I implemented a `useEffect` cleanup hook that runs every 10 seconds. If a portion has been "Approved" for more than 2 minutes without being consumed, the system automatically cancels the approval and returns the portion to the "Available" pool.

### 3. Identical Items (The Ketchup Bug)
**Logic:** I avoided using the item name as a key. 
- **Rule:** Every item added to the fridge is assigned a unique ID via `crypto.randomUUID()`. 
- **Result:** Two identical bottles of Heinz Ketchup exist as separate objects in the state array, allowing users to track consumption for their specific bottle.

### 4. The Phantom Eater (Reality Desync)
**Logic:** I added an "Inventory Audit" feature.
- **Rule:** Any user can trigger a "Report Missing" action. This forces the item quantity to 0 and marks it as "System Corrected," ensuring future cost splits aren't based on ghost items.

## Engineering Decisions
- **In-Memory State:** Used React `useState` for rapid prototyping of state transitions.
- **Defensive Programming:** The UI disables buttons dynamically based on item availability to prevent invalid user inputs before they reach the logic layer.
