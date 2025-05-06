import Establishments from "./Establishments";
import AvailableBags from "./AvailableBags";

function HomePage(props) {
    return (
        <>
            <Establishments establishments={props.establishments} />
            <AvailableBags bags={props.bags} />
        </>
    );
}

export default HomePage;