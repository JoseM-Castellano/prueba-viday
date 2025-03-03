import pymongo

conn = pymongo.MongoClient("mongodb://172.17.0.2:27017/")
db = conn["peliculasdb"]
peliculascol = db["peliculas"]