from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from.models import FileUpload
import os
from busigence import settings
from django.http import HttpResponse, HttpRequest
import mysql.connector
import functools
import operator
import csv, json
# Create your views here.



def test(request):
    return render(request, 'assignment/problem1.html')


def upload(request):
    if request.method == 'POST':
        new_file = FileUpload(
            file = request.POST['file']
        )
        new_file.save()
        print(new_file.file.path)
        path = new_file.file.path

        return render(request, 'assignment/problem1.html', {'path':path})

def loadfile(request):
    path = "C:/Users/Harsha/Desktop/Github/busigence/templates/assignment/orders.csv"
    data = open(path, 'rb').read()
    return HttpResponse(data, content_type='text/csv')


def sql(request):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="Sidramanna@1",
        database="djangoproject"
    )

    mycursor = mydb.cursor()
    cursor2 = mydb.cursor()
    mycursor.execute("show databases")

    result = mycursor.fetchall()
    myresult = []

    table_list = []
    database_dict = {}
    for i in range(len(result)):
        str = functools.reduce(operator.add, (result[i]))
        myresult.append(str)

        cursor2.execute("USE {};".format(str))
        cursor2.execute("show tables")
        tab_result = cursor2.fetchall()
        all_tables = []
        for j in range(len(tab_result)):
            table_str = functools.reduce(operator.add, tab_result[j])
            all_tables.append(table_str)
        database_dict[str]=all_tables
    # for j in range(len(table_list)):
    #     tables = functools.reduce(operator.add, (table_list[j]))
    #     all_tables.append(tables)

    output_data = json.dumps(database_dict)

    return HttpResponse(output_data, content_type='text')

