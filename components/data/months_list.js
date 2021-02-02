
let months = [];
let mnths = function generateArrayOfYears() {
    let ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i = 0; i < ms.length; i++) {
        months.push(<span><a key={i}>{ms[i]}</a>|</span>)
    }
    return months
}
mnths();

const Months = (props) => {
    return <>{months}</>;
}

export default Months;