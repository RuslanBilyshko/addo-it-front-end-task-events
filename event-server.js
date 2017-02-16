/**
 * Хранилище событий
 * @type {Array}
 */
var EventStorage = [];

/**
 * Текущая дата
 * @type {Date}
 */
var currDate = new Date();

currDate.toLocaleString();
/**
 * События, присланные сервером
 * @type {*[]}
 */
var events = [
    {
        id: 1,
        name: "Мыльное шоу",
        dateStart: new Date(2016, 11, 25, 12, 0),
        dateEnd: new Date(2016, 11, 25, 14, 0),
        location: "Театральная площадь"
    },
    {
        id: 2,
        name: "Концерт к 8 Марта",
        dateStart: new Date(2017, 2, 8, 17, 0),
        dateEnd: new Date(2017, 2, 8, 19, 0),
        location: "ПД Листопад"
    },
    {
        id: 3,
        name: "День Святого Валентина",
        dateStart: new Date(2017, 1, 14, 12, 0),
        dateEnd: new Date(2017, 0, 1, 14, 0),
        location: "Клуб Робингуд"
    },
    {
        id: 4,
        name: "Праздник Масеницы",
        dateStart: new Date(2017, 1, 1, 12, 0),
        dateEnd: new Date(2017, 1, 1, 17, 0),
        location: "Театральная площадь"
    },
    {
        id: 5,
        name: "1 апреля",
        dateStart: new Date(2017, 3, 1, 12, 0),
        dateEnd: new Date(2017, 3, 1, 13, 0),
        location: "Театральная площадь"
    },
    {
        id: 6,
        name: "Курс Addo-IT",
        dateStart: new Date(2017, 1, 7, 19, 0),
        dateEnd: new Date(2017, 5, 7, 21, 0),
        location: "Google Hangouts"
    }
];

/**
 * Форматирование вывода даты
 * @param date
 * @param format
 */
function dateFormat(date)
{
    var months = [
        'января',
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];

    return date.getDate() + " "
        + months[date.getMonth()] + " "
        + date.getFullYear() + " "
        + date.getHours() + ":"
        + date.getMinutes();

}

/**
 * Функция добавления событий в хранилище
 * @param events_data
 */
function addEventsToStorage(events_data)
{
    events_data.forEach(function(item){
        EventStorage[item.id] = {
            name : item.name,
            dateStart: item.dateStart,
            dateEnd: item.dateEnd,
            location: item.location
        }
    });
}

/**
 * Добаление событий вхранилище
 */
addEventsToStorage(events);

/**
 * Проверка на сущесвование
 * @param id
 * @returns {boolean}
 */
function hasEvent(id) {

    if (EventStorage.hasOwnProperty(id))
        return true;

    return false;
}

/**
 * Получение события
 * @param id
 * @returns {*}
 */
function getEvent(id)
{
    if(hasEvent(id))
        return EventStorage[id];

    return {};
}

//Была идея реализовать следующие 3 функции с помощю 1 и параметра-флага
//но показалось что код будет слишком громосткий
//

/**
 * Получение списка прошедших событий
 * @return array
 */
function getBeforeEvents() {
    var result = [];

    EventStorage.forEach(function (item) {
        if (item.dateEnd.getTime() < currDate.getTime())
            result.push(item);
    });

    return result;
}

/**
 * Получение списка текущих событий
 * @return array
 */
function getCurrentEvents() {
    var result = [];

    EventStorage.forEach(function (item) {
        if (item.dateStart.getTime() < currDate && item.dateEnd.getTime() >= currDate)
            result.push(item);
    });

    return result;
}

/**
 * Получение списка событий в будущем
 * @return array
 */
function getAfterEvents() {
    var result = [];

    EventStorage.forEach(function (item) {
        if (item.dateStart.getTime() > currDate)
            result.push(item);
    });

    return result;
}


/**
 * Строковое представление события
 */
function eventToString(event)
{
    return "Название: "
        + event.name + "; "
        + "Дата начала: "
        + dateFormat(event.dateStart) + "; "
        + "Дата окончания: "
        + dateFormat(event.dateEnd) + "; "
        + "Место проведения: "
        + event.location;
}

/**
 * Листинг событий
 * @return array
 */
function eventListing()
{
    var result = [];
    EventStorage.forEach(function(item){
        result.push(eventToString(item));
    });

    return result;
}

//Текущая дата
console.log("Текущая дата - " + dateFormat(currDate));
console.log("----------------------------------------------");

console.log("Получение события с Идентификатором 2");
console.log("----------------------------------------------");
console.log(getEvent(2));

console.log("Получение события с Идентификатором 222");
console.log("----------------------------------------------");
console.log(getEvent(222));

console.log("Прошедшие события");
console.log("----------------------------------------------");
console.log(getBeforeEvents());

console.log("Текущие события");
console.log("----------------------------------------------");
console.log(getCurrentEvents());

console.log("Будущие события");
console.log("----------------------------------------------");
console.log(getAfterEvents());

console.log("Листинг событий");
console.log("----------------------------------------------");
console.log(eventListing());
