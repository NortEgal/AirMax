import pymysql
import request
import random

try:
    con = pymysql.connect("VH274.spaceweb.ru", "sokolovma2", "2140174Qq", "sokolovma2", charset="utf8", cursorclass=pymysql.cursors.DictCursor, init_command='SET NAMES UTF8')
except:
    print("ytn")
with con:
    cur = con.cursor()
    plane_id_mas = ['1', '3', '4', '8', '9', '10', '11', '12', '13']
    #where_from_mas = ["Perm", 'Moscow', 'Kazan', 'Valencia', 'Warsaw', 'Washington', 'Vienna', 'Humburg', "Delhi"]
    #where_to_mas = ["Perm", 'Moscow', 'Kazan', 'Valencia', 'Warsaw', 'Washington', 'Vienna', 'Humburg', "Delhi"]
    where_from_mas = ["Пермь", 'Москва', 'Казань', 'Валенсия', 'Варшава', 'Вашингтон', 'Виенна', 'Гамбург', "Делфи"]
    where_to_mas = ["Пермь", 'Москва', 'Казань', 'Валенсия', 'Варшава', 'Вашингтон', 'Виенна', 'Гамбург', "Делфи"]
    departure_time_mas = ["2019-10-22 00:00:00", '2019-10-22 10:00:00', '2019-10-22 13:00:00', '2019-10-22 08:00:00',
                          '2019-10-16 00:00:00']
    arrival_time_mas = ['2019-10-22 00:00:00', '2019-10-22 23:00:00', '2019-10-22 14:00:00', '2019-10-22 19:00:00',
                        '2019-10-23 00:00:00']
    for i in range(0, 198):

        plane_id = plane_id_mas[random.randint(0, 8)]
        where_from = where_from_mas[random.randint(0, 8)]
        where_to = where_to_mas[random.randint(0, 8)]
        departure_time = departure_time_mas[random.randint(0, 4)]
        arrival_time = arrival_time_mas[random.randint(0, 4)]

        cur.execute("INSERT INTO `flight` (`id`, `plane_id`, `where_from`, `where_to`, `time_departure`, `time_arrival`, `free_places`, `price`) VALUES (NULL, '" + plane_id + "', '" + where_from + "', '" + where_to + "', '" + departure_time + "', '" + arrival_time + "', '400', '0')")
        #cur.execute("INSERT INTO `flight` (`id`, `plane_id`, `where_from`, `where_to`, `departure_time`, `arrival_time`, `free_places`, `price`) VALUES (NULL, '" + plane_id_mas[plane_id] + "', '" + where_from_mas[where_from] + "', '" + where_to_mas[where_to] + "', '" + departure_time_mas[departure_time] + "', '" + arrival_time_mas[departure_time] + "', '0', '0')")

    """cur.execute("SELECT * FROM `flight` WHERE 1")
    rows = cur.fetchall()
    print(rows)
    for row in rows:
        print(row["id"], row["plane_id"], row["where_from"], row["where_to"], row["departure_time"], row["arrival_time"], row["free_places"], row["price"])

    cur = con.cursor()

    cur.execute("SELECT * FROM `flight` WHERE 1")

    rows = cur.fetchall()
    desc = cur.description
    #vivod += str(desc["id"]) + " " + str(desc["plane_id"]) + " " + str(desc["where_from"]) + " " + str(desc["where_to"]) + " " + str(desc["departure_time"]) + " " + str(desc["arrival_time"]) + " " + str(desc["free_places"]) + " " + str(desc["price"])
    print(desc)"""
