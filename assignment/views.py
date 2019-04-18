from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import FileUpload
from .forms import UploadForm
import os
from busigence import settings
from django.http import HttpResponse, HttpRequest
import mysql.connector
import functools
import operator
import csv, json
# Create your views here.


@csrf_exempt
def index(request):

    # if request.is_ajax:
    #     new_file = UploadForm(request.POST)
    #     if new_file.is_valid():
    #         print('success')
    #         new_file.save()
    #     print('sdjkfb')
    #     print(request.POST)
        # new_file = FileUpload(
        #     file=request.POST['file']
        # )
        # new_file.save()
        # print(new_file.file.path)
        # path = new_file.file.path

    #     return JsonResponse({'result': 'success'})
    # else:
    #     print('request is not ajax')

    return render(request, 'assignment/problem1.html')


@csrf_exempt
def upload(request):
    print('ajksdnfklansd')
    print(request.POST)
    print(request.POST['file'][0])

    # new_file = FileUpload(
    #     file = request.POST['file']
    # )
    # new_file.save()
    new_file = request.POST['file']
    print(new_file.file.path)
    path = new_file.file.path

    return JsonResponse(path, content_type='text')
    # return render(request, 'assignment/problem1.html', {'path':path})

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

def sqlcd(request):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="Sidramanna@1",
        database="djangoproject"
    )

    mycursor = mydb.cursor(buffered=True)
    cursor2 = mydb.cursor()
    mycursor.execute("describe customers")
    cursor2.execute("describe orders")

    column_name1 = []
    column_name2 = []

    result1 = mycursor.fetchall()
    result2 = cursor2.fetchall()

    for i in range(len(result1)):
        coloumn = result1[i][0]
        column_name1.append(coloumn)
    for i in range(len(result2)):
        coloumn = result2[i][0]
        column_name2.append(coloumn)
    # all_columns = []
    output_data = json.dumps([column_name1, column_name2])
    print(output_data)
    return HttpResponse(output_data, content_type='text')
    # return HttpResponse('success')


def tablejoin(request):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="Sidramanna@1",
        database="djangoproject"
    )

    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("select * from orders inner join customers on orders.customer_id=customers.customer_id order by employee_id;")
    data = mycursor.fetchall()

    return HttpResponse(json.dumps(data))