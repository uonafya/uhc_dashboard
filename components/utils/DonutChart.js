import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const UrgeWithPleasureComponent = (props) => (
  <CountdownCircleTimer
    isPlaying={false}
    duration={100}
    initialRemainingTime={props.value}
    size={100}
    colors={[
      ['#004777', 0.33],
      ['#F7B801', 0.33],
      ['#A30000', 0.33],
    ]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
)


export default UrgeWithPleasureComponent
