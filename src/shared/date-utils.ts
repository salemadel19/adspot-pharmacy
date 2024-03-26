import * as moment from 'moment';

export function isValidDate(date: Date) {
  return moment(date).isValid() &&
    date.getTime() !== 0 &&
    date.toString() !== ''
    ? date.toLocaleDateString('sv')
    : '';
}
export function formatVideoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = remainingSeconds.toString().padStart(2, '0');
  return `${hoursString}:${minutesString}:${secondsString}`;
}

export function formatTime(seconds: number): string {
  seconds = Math.round(seconds);
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const formattedHrs = padZero(hrs);
  const formattedMins = padZero(mins);
  const formattedSecs = padZero(secs);

  return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
}

export function padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}
