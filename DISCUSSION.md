# DISCUSSION: Feature Extensions for Solace Advocates App

## 🚀 Feature Extension 1: : **[Add Pagination to Advocates API and Table]**

**Goal:**  
Definitely want to add pagination to our queries considering we are dealing with many entries.

**Proposed Extension:**

- Implement cursor based pagination to the advocates query
- Add footer to table with buttons that will allow user to navigate forward and backward in result set

**Benefits:**

- Cursor based pagination is more efficient for large datasets, especially when data is frequently updated.

**Challenges/Considerations:**

- Can be more complicated to determine total number of entries, which may not be beneficial if needing to display that in the app (e.g. in the footer)

---

## 🚀 Feature Extension 2: **[Add Advocate Search Filters in App]**

**Goal:**  
Generally think about ways to make searching more intuitive and easier for users, e.g. adding filters to search specifically by various attributes

**Proposed Extension:**  
Rather than a single search bar, add filters that allow users to set the parameters they want to search for (e.g. location, specialty, etc)

**Benefits:**

- Give users some extra flexibility when performing searches, especially if there are a lot of results to parse through

**Challenges/Considerations:**

- Need to consider best practices when it comes to design + accessbility
