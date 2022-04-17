const months = ["ene", "feb", "mar","abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export const formatDate = (date)=>{
    let _date = new Date(`${date}T00:00:00`);
    let formatted_date = _date.getDate() + " de " + months[_date.getMonth()] 
    return formatted_date;
}