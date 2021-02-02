
let years = [];
let yrs = function generateArrayOfYears() {
    let max = new Date().getFullYear()
    let min = max - 9
    for (var i = min; i <= max; i++) {
        years.push(<span><a key={i}>{i}</a>|</span>)
    }
    return years
}
yrs();

const Years = (props) => {
    return <>{years}</>;
}

export default Years;