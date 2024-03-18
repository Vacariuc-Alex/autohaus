# Autohaus

Autohaus is a web application built on React and TypeScript. This application serves as a platform similar to a "car noticeboard," where users can browse cars, filter them by brand, search by car names and models, and view detailed information including price, VIN, company, model, and pictures.

## Features


### Browsing

Users can navigate through a list of cars, exploring various options available for sale. This feature allows users to casually browse through the available inventory without any specific filtering or search criteria.


### Pagination

Users can view a specific amount of items per page, with the ability to navigate through multiple pages. Pagination allows users to manage the number of items displayed per page as well as navigate between different pages.

### Filtering

Users can filter cars by selecting one or multiple checkboxes corresponding to the desired brands. This filtering mechanism enables users to narrow down their search results based on specific criteria.

### Search

The search functionality enables users to type keywords into a search bar to find similar products quickly. This feature enhances the user experience by providing a convenient way to discover relevant items.

### Wishlist

Users can mark items as favorites by clicking on a heart icon located in the top right corner of each item. Additionally, users can view all selected cars in their wishlist page, making it easy to track and manage favorite items.

### Details

Clicking on an item opens a new tab displaying comprehensive information about the selected car. Users can view additional images if available, allowing for a more in-depth exploration of the product.

### Authentication

While unauthenticated users can browse items, adding a product requires registration. User data is securely stored, with passwords encrypted for enhanced security. After logging in, users remain authenticated for 24 hours. Upon adding an item, the user becomes its owner, gaining the ability to edit or delete it as needed.

## Usage

To use Autohaus, follow these steps:

1. Make sure you have Node.js installed on your system.
2. Set up a development environment with an editor that supports React app development (e.g., WebStorm from JetBrains).
3. Clone the repository to your local machine.
4. Navigate to the project directory and install dependencies by running `npm install`.
5. Start the JSON server by running `npm run json-server`.
6. Once the JSON server is running, start the application by executing the following command`npm start`.
7. You can also run tests with `npm test`.

## Technologies Used

- React
- TypeScript
- HTML
- CSS
- JavaScript

## Libraries and Tools

### Frontend Libraries

- yup
- styled-components
- React Icons
- Material-UI (MUI)
- React Router
- Redux Toolkit
- Redux Saga
- React Spring

### Testing Libraries

- Jest
- React Testing Library

### Other Tools

- Axios
- json-server (used instead of backend)

## Contributing

Contributions to Autohaus are welcome! Please fork the repository, make your changes, and submit a pull request.
