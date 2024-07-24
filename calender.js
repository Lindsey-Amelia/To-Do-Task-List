// today's date
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate();

// Function to generate calendar
function generateCalendar(month, year) {
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = ''; // Clear previous calendar

    // Month names and number of days in each month
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysInMonth = [31, 28 + (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Calculate first day of the month
    const firstDay = new Date(year, month).getDay();

    // Create header with month and year
    const header = document.createElement('div');
    header.className = 'flex text-green-600 justify-between items-center mb-4';
    header.innerHTML = `
        <span class="text-lg font-bold">${monthNames[month]} ${year}</span>
    `;
    calendarDiv.appendChild(header);

    // Create table for the calendar
    const table = document.createElement('table');
    table.className = 'w-full';
    calendarDiv.appendChild(table);

    // Create table headers (days of the week)
    const thead = document.createElement('thead');
    table.appendChild(thead);
    const tr = document.createElement('tr');
    thead.appendChild(tr);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        th.className = 'text-center py-2 text-xs font-medium text-green-500';
        tr.appendChild(th);
    });

    // Create table body (days of the month)
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Calculate number of rows needed
    const numRows = Math.ceil((daysInMonth[month] + firstDay) / 7);

    // Generate cells for each day
    let dayOfMonth = 1;
    for (let i = 0; i < numRows; i++) {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (let j = 0; j < 7; j++) {
            const td = document.createElement('td');
            if (i === 0 && j < firstDay) {
                // Empty cells before the first day of the month
                td.textContent = '';
            } else if (dayOfMonth > daysInMonth[month]) {
                // Stop creating cells when all days of the month are rendered
                break;
            } else {
                // Create cell for each day of the month
                td.textContent = dayOfMonth;
                td.className = 'text-center rounded hover:cursor-pointer hover:bg-green-100 py-2 text-sm text-gray-700';

                // Check if current cell is today's date and apply special styling
                if (dayOfMonth === currentDate && month === currentMonth && year === currentYear) {
                    td.classList.add('bg-green-500', 'text-white', 'font-bold', 'rounded', 'h-8', 'flex', 'justify-center', 'items-center');
                }

                // Example: Add onClick event for selecting a date
                td.addEventListener('click', () => {
                    console.log(`Clicked on ${monthNames[month]} ${dayOfMonth}, ${year}`);
                });
                dayOfMonth++;
            }
            tr.appendChild(td);
        }
    }
}

// Initial call to generate current month's calendar
generateCalendar(currentMonth, currentYear);
