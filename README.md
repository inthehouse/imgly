## Overview

This project implements a tree structure component using React, TypeScript, and Redux for state management. It allows for dynamic rendering of hierarchical data, providing features such as node expansion/collapse, node highlighting, and drag-and-drop functionality for node reordering. The architecture emphasizes a clean, modular design, leveraging reusable components for scalability and maintainability.

The leaf(s) can be clicked on for further data. Any leaf that does not have any data will give an error.

To run the project, use the following commands:

```bash
yarn build
```
```bash
yarn start
```

## Features

- **Hierarchical Tree Structure**: Visualizes nested data in a tree format.
- **Node Expansion/Collapse**: Allows users to expand or collapse nodes to view or hide children.
- **Node Highlighting**: Enables users to highlight selected nodes for easier navigation.
- **Drag-and-Drop Support**: Facilitates reordering of tree nodes through drag-and-drop interaction.
- **Theming Support**: Uses Context API to manage global theme state.
- **Accessibility Considerations**: Ensures the application is usable for all users by incorporating accessibility features such as ARIA labels, keyboard navigation, and visual indicators for focus.

## Accessibility

This project was designed with accessibility in mind, ensuring that all users, including those with disabilities, can effectively navigate and interact with the application.

- **ARIA Attributes**: We have included ARIA attributes like `aria-expanded` for the expand/collapse buttons to make the tree structure accessible to screen readers.
- **Keyboard Navigation**: The tree structure supports keyboard interaction, allowing users to navigate through nodes using the Tab, Enter, and Space keys, making it accessible without the need for a mouse.
- **Focus Management**: Visual indicators are provided to highlight focused elements, ensuring that users relying on keyboard navigation can easily track which element is currently focused.
- **Accessible Labels**: Buttons and interactive elements have been provided with descriptive labels (e.g., "Expand" and "Collapse") to ensure that screen readers can convey their functionality accurately to users.

These considerations improve the overall accessibility and usability of the project, aligning with best practices for web development to ensure a more inclusive experience.

## Architecture and Design Decisions

### Component-Based Architecture

- **Reusable Components**: The project follows a component-based architecture, allowing for the creation of independent, reusable components. This approach enhances code maintainability and makes it easier to develop and test individual parts of the application.
- **Separation of Concerns**: Each component is responsible for a specific part of the application, leading to cleaner and more organized code. This separation makes it simpler to manage state and behavior in complex applications compared to a traditional MVC (Model-View-Controller) architecture.
- **Scalability**: As the application grows, adding new features becomes straightforward with a component-based approach. New components can be created or existing ones modified without affecting the overall application structure, making it easier to scale the application over time.
- **Enhanced Collaboration**: A component-based architecture allows for better collaboration among team members, as developers can work on different components independently. This leads to faster development cycles and a more efficient workflow.

### State Management

- **Redux for State Management**: The project utilizes Redux to manage global state, including highlighted nodes and the currently selected node. This ensures a consistent state across the application and facilitates easier debugging and maintenance.
- **Context for Theming**: The Context API is used to manage the global theme state, allowing for easy toggling between themes (e.g., light and dark modes) across the application without passing props through multiple components. Choosing Context for theme management is solely a personal preference based on the following reasons:
  - It demonstrates experience with using Context for state management.
  - Context is ideal for handling smaller, less frequently changing data (like theme or language preferences). This keeps things organized without the complexity of Redux. For more dynamic, data-driven parts of the application, I prefer Redux, while using Context for simpler features like theme or language management feels more appropriate to me.

## Scope and Limitations

This project represents the core functionality of a tree structure component, and certain features have been left out to keep the assignment focused and concise.

- **No Pages or Routing**: Since the assignment focuses on the tree structure component, pages, routing, and other aspects like navigation have not been implemented. Given the scope, these features were not essential at this stage.
- **Basic Design**: The UI is kept simple for the purpose of this assignment, focusing on the tree structure. Future enhancements could include more sophisticated UI elements, responsive design, and more advanced theming options.
- **Further Testing Needed**: While basic tests are included, comprehensive unit and integration testing are recommended for production-ready code.

## Testing

The project includes basic tests designed to ensure the functionality of the Redux store, the `TreeView`, and the `Toggle` component. The tests cover only basic aspects and serve as a starting point for further expansion to ensure the robustness of the application.

### Running Tests

To run the tests, use the following command:

```bash
yarn test
```
