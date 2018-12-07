def print_result(func):
    def printer():
        print(func.__name__)
        res_of_func = func()
        # print(res_of_func)

        if isinstance(res_of_func, list):
            print('\n'.join([str(i) for i in res_of_func]))
        elif isinstance(res_of_func, dict):
            print('\n'.join(["{} = {}".format(key, value) for key, value in res_of_func.items()]))
        else:
            print(res_of_func)

    return printer


@print_result
def test_1():
    return 1


@print_result
def test_2():
    return 'iu'


@print_result
def test_3():
    return {'a': 1, 'b': 2}


@print_result
def test_4():
    return [1, 2]


test_1()
test_2()
test_3()
test_4()
