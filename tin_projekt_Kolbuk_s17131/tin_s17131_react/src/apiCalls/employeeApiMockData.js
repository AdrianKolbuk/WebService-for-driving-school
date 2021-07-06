export const employeeList = [
    {
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
        "password": "qwerty"
    },
    {
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
        "password": "123456"
    },
    {
        "_id": 3,
        "firstName": "Marian",
        "lastName": "Nowak",
        "email": "marian.nowak@zetka.com",
        "phone": "+48601222044",
        "salary": "3500",
        "bonus": "15",
        "category": 'B',
        "expDate": "2033-05-22",
        "permisson": "0",
        "password": "qwe123"
    }
]

export const employeeDetailsList = [
    {
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
        "history": [
            {
                "_id": 1,
                "dateFrom": "2009-01-01",
                "dateTo": "2009-01-01",
                "opinion": "fajen barszo",
                "emp_id": 1,
                "training_id": 1,
                "training": {
                    "_id": 1,
                    "trainingType": "Nauka Driftu",
                    "duration": "1",
                    "level": "1",
                    "price": "300",
                }
            },
            {
                "_id": 3,
                "dateFrom": "2009-01-03",
                "dateTo": "2009-01-03",
                "opinion": null,
                "emp_id": 1,
                "training_id": 2,
                "training": {
                    "_id": 2,
                    "trainingType": "Jazda torowa",
                    "duration": "2",
                    "level": "3",
                    "price": "350",
                }
            }
        ]
    },
    {
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
        "history": [
            {
                "_id": 2,
                "dateFrom": "2009-01-02",
                "dateTo": "2009-01-02",
                "opinion": null,
                "emp_id": 2,
                "training_id": 1,
                "training": {
                    "_id": 1,
                    "trainingType": "Nauka Driftu",
                    "duration": "1",
                    "level": "1",
                    "price": "300",
                }
            }
        ]
    },
    {
        "_id": 3,
        "firstName": "Marian",
        "lastName": "Nowak",
        "email": "marian.nowak@zetka.com",
        "phone": "+48601222044",
        "salary": "3500",
        "bonus": "15",
        "category": 'B',
        "expDate": "2033-05-22",
        "permisson": "0",
        "password": "qwe123",
        "history": []
    }
]