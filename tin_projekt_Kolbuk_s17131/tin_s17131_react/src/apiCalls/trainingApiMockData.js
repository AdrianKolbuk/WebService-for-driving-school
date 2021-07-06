export const trainingList = [
    {
        "_id": 1,
        "trainingType": "Nauka driftu",
        "duration": 1,
        "level": 1,
        "price": 300
    },
    {
        "_id": 2,
        "trainingType": "Jazda torowa",
        "duration": 2,
        "level": 3,
        "price": 350
    }
]

export const trainingDetailsList = [
    {
        "_id": 1,
        "trainingType": "Nauka driftu",
        "duration": 1,
        "level": 1,
        "price": 300,
        "history": [
            {
                "_id": 1,
                "dateFrom": "2009-01-01",
                "dateTo": "2009-01-01",
                "opinion": "fajen barszo",
                "training_id": 1,
                "emp_id": 1,
                "employee": {
                    "_id": 1,
                    "firstName": "Jan",
                    "lastName": "Kowalski",
                    "email": "jan.kowalski@zetka.com",
                    "phone": "+48601222042",
                    "salary": "5000",
                    "bonus": "20",
                    "category": 'B',
                    "expDate": "2030-09-20",
                    "permisson": "1",
                    "password": "qwerty",
                }
            },
            {
                "_id": 3,
                "dateFrom": "2009-01-03",
                "dateTo": "2009-01-03",
                "opinion": null,
                "training_id": 1,
                "emp_id": 2,
                "employee": {
                    "_id": 2,
                    "firstName": "Adam",
                    "lastName": "Zieliński",
                    "email": "adam.zielinski@zetka.com",
                    "phone": "+48601222043",
                    "salary": "4500",
                    "bonus": "25",
                    "category": 'B',
                    "expDate": "2030-02-15",
                    "permisson": "1",
                    "password": "123456",
                }
            }
        ]
    },
    {
        "_id": 2,
        "trainingType": "Jazda torowa",
        "duration": 2,
        "level": 3,
        "price": 350,
        "history": [
            {
                "_id": 2,
                "dateFrom": "2009-01-02",
                "dateTo": "2009-01-02",
                "opinion": null,
                "training_id": 2,
                "emp_id": 1,
                "employee": {
                    "_id": 1,
                    "firstName": "Jan",
                    "lastName": "Kowalski",
                    "email": "jan.kowalski@zetka.com",
                    "phone": "+48601222042",
                    "salary": "5000",
                    "bonus": "20",
                    "category": 'B',
                    "expDate": "2030-09-20",
                    "permisson": "1",
                    "password": "qwerty",
                }
            }
        ]
    }
]