# dorm-marketplace-capstone
# Dorm Marketplace - Product Requirements Document (MVP)

## 1. Scope Cut
* **In-App Messaging:** We are excluding a chat system to avoid the complexity of WebSockets and database persistence. Users will coordinate via university email provided in the listing.
* **Integrated Payments:** Digital transactions (Stripe/PayPal) are cut to avoid legal and financial compliance overhead. The app facilitates "in-person handoffs" only.
* **Advanced Search/Filters:** Categorization and complex search algorithms are excluded for V1. The MVP will use a single global feed to ensure students see all available campus deals.

## 2. MVP Features
* **Campus Listing Feed:** A centralized marketplace where students can post items with a title, price, and "Mark as Sold" toggle.
* **Claiming Logic:** A reservation system that allows a buyer to temporarily "lock" an item for a handoff.
* **Seller Management Dashboard:** A simple interface for sellers to manage their active listings and manually override status for "Hallway Sales."

## 3. Acceptance Criteria (Claim Item Flow)
* **Scenario:** Successful Reservation
    * **Given** an item has the status "Available"
    * **When** a student clicks the "Claim" button
    * **Then** the status must immediately change to "Pending" and show a 2-minute countdown timer to other users.
* **Scenario:** Concurrency Conflict
    * **Given** an item is currently being viewed by two users
    * **When** both users click "Claim" at nearly the same time
    * **Then** the system must only process the first request and show a "Already Claimed" error to the second user.
* **Scenario:** Auto-Release (Ghost Buyer)
    * **Given** an item status is "Pending"
    * **When** the 2-minute timer reaches zero without the seller confirming the handoff
    * **Then** the status must revert to "Available" automatically.
