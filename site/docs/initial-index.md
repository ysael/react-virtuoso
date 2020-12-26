---
id: initial-index
title: Start from a certain item
sidebar_label: Initial Index
slug: /initial-index/
---

The `initialTopMostItemIndex` property changes the initial location of the list to display the item at the specified index.

Note: The property applies to the list only on mount. If you want to change the position of the list afterwards, use the [scrollToIndex](/scroll-to-index/) method.

```jsx live
<Virtuoso
  data={generateUsers(1000)}
  initialTopMostItemIndex={800}
  itemContent={(index, user) => (
    <div style={{ 
      backgroundColor: user.bgColor,
      padding: '1rem 0.5rem'
    }}>
      <h4>{user.index}. {user.name}</h4>
      <div style={{ marginTop: '1rem' }}>{user.description}</div>
    </div>
  )}
/>
```
