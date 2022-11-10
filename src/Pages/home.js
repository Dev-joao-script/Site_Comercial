import Carrousel from '../components/Carrousel'
import Header from '../components/Header.js';

const Home = () => {

    return (
        <div>
            <Header component="true"/>
            <Carrousel props={"all"} />
        </div>
    )
}

export default Home