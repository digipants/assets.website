// An object to store the room type rates
$(function(){
    var rates = {
        select: {
            weekdays:0,
            weekends:0
        },
        standard: {
            weekdays: 2100,
            weekends: 2300
        },
        deluxe: {
            weekdays: 2500,
            weekends: 2700
        },
        suite: {
            weekdays: 2900,
            weekends: 3100
        }
    };
    // Get the room type, check-in, and check-out input elements
    var roomType = document.getElementById("room-type");
    var checkIn = document.getElementById("check-in-date");
    var checkOut = document.getElementById("check-out-date");

    // Get the rate display element
    var rateDisplay = document.getElementById("rate-display");

    // Add an event listener to the room type input to update the rate when it changes
    roomType.addEventListener("change", updateRate);

    // Add an event listener to the check-in input to update the rate when it changes
    checkIn.addEventListener("change", updateRate);

    // Add an event listener to the check-out input to update the rate when it changes
    checkOut.addEventListener("change", updateRate);

    // The function to update the rate based on the room type and check-in and check-out dates
    function updateRate() {
        var selectedRoomType = roomType.value;
        var checkInDate = new Date(checkIn.value);
        var checkOutDate = new Date(checkOut.value);
        var days = getWeekdaysBetweenDates(checkInDate, checkOutDate);

        var totalRate = 0;
        for (var i = 0; i < days.length; i++) {
            var day = days[i];
            var rate;
            if (day.getDay() === 0 || day.getDay() === 6) {
                rate = rates[selectedRoomType].weekends;
            } else {
                rate = rates[selectedRoomType].weekdays;
            }
            totalRate += rate;
        }
        rateDisplay.innerHTML = "Total Rate: ₹" + totalRate;
    }

    // A helper function to get an array of weekdays between two dates
    function getWeekdaysBetweenDates(startDate, endDate) {
        var weekdays = [];
        var currentDate = startDate;
        while (currentDate <= endDate) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                weekdays.push(currentDate);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return weekdays;
    };
});
