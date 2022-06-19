import { Link } from "react-router-dom";
import Header from "../Header";

const Home = ({ inHome = true }) => {
    return (
        <div className="App">
            {inHome && (<Header params={{title:"HealthSafe Coding Exam", inShopping:false}} />)}
            <nav>
                <Link to="/product">Products</Link> |{" "}
                <Link to="/shopping">Shopping</Link>
            </nav>
        </div>
    );
}

export default Home