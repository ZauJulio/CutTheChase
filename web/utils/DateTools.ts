const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  
export function msToTime(millisec: number) {
  const minutes = (millisec / (1000 * 60)).toFixed(1);
  const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (parseFloat(minutes) < 60) {
    return minutes + " Min";
  } else if (parseFloat(hours) < 24) {
    return hours + " Horas";
  } else {
    return days + " Dias";
  }
}

export function getFormatedData(date: string | number | Date, duration: number) {
  date = new Date(date);

  const day = date.getDate().toString().padStart(2, "0");
  const month = months[parseInt((date.getMonth() + 1).toString().padStart(2, "0"))];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day} de ${month} ${year} - ${hours}:${
    minutes === 0 ? "00" : minutes
  }, ${msToTime(duration)}`;
}
