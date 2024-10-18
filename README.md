## Overview

This project implements a tree structure component using React, TypeScript, and Redux for state management. It allows for dynamic rendering of hierarchical data, providing features such as node expansion/collapse, node highlighting, and drag-and-drop functionality for node reordering. The architecture emphasizes a clean, modular design, leveraging reusable components for scalability and maintainability.<br>

The leaf(s) can be clicked on for further data. Any leaf that does not have any data will give an error. <br>

To run the project, use the following commands:

```bash
npm install
```
```bash
npm start
```

## Features

- **Hierarchical Tree Structure**: Visualizes nested data in a tree format.<br>
- **Node Expansion/Collapse**: Allows users to expand or collapse nodes to view or hide children.<br>
- **Node Highlighting**: Enables users to highlight selected nodes for easier navigation.<br>
- **Drag-and-Drop Support**: Facilitates reordering of tree nodes through drag-and-drop interaction.<br>
- **Theming Support**: Uses Context API to manage global theme state.<br>

## Architecture and Design Decisions

### Component-Based Architecture

- **Reusable Components**: The project follows a component-based architecture, allowing for the creation of independent, reusable components. This approach enhances code maintainability and makes it easier to develop and test individual parts of the application.<br>
- **Separation of Concerns**: Each component is responsible for a specific part of the application, leading to cleaner and more organized code. This separation makes it simpler to manage state and behavior in complex applications compared to a traditional MVC (Model-View-Controller) architecture.<br>
- **Scalability**: As the application grows, adding new features becomes straightforward with a component-based approach. New components can be created or existing ones modified without affecting the overall application structure, making it easier to scale the application over time.<br>
- **Enhanced Collaboration**: A component-based architecture allows for better collaboration among team members, as developers can work on different components independently. This leads to faster development cycles and a more efficient workflow.<br>

### State Management

- **Redux for State Management**: The project utilizes Redux to manage global state, including highlighted nodes and the currently selected node. This ensures a consistent state across the application and facilitates easier debugging and maintenance.<br>
- **Context for Theming**: The Context API is used to manage the theme state globally. This allows for easy toggling of themes (e.g., light and dark mode) throughout the application without prop drilling.<br>

## Testing

The project includes basic tests designed to ensure the functionality of the Redux store and the `TreeView` component. The tests cover only basic aspects and while the tests are foundational, they serve as a starting point for further expansion to ensure the robustness of the application.<br>

### Running Tests

To run the tests, use the following command:

```bash
npm test
