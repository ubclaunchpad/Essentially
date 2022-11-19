import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import AllRoutes from "./AllRoutes"

ReactDOM.render(
    <MemoryRouter>
        <AllRoutes />
    </MemoryRouter>
    , document.getElementById('root'));
