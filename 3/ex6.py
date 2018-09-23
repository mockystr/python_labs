import json
import random
import time


class Foo:
    def __init__(self):
        self.script_time = 0

    def __enter__(self):
        self.script_time = time.time()

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(time.time() - self.script_time)
        self.script_time = 0


def print_result(func):
    def printer(lst):
        print(func.__name__)
        res_of_func = func(lst)

        if isinstance(res_of_func, list):
            print('\n'.join([str(i) for i in res_of_func]))
        return res_of_func

    return printer


@print_result
def f1(*args):
    return sorted(list(set([data[prof_el]["job-name"].lower() for prof_el in range(len(data))])))


@print_result
def f2(profs):
    return list(filter(lambda x: x.startswith("программист"), profs))


@print_result
def f3(profs):
    return [i + " с опытом Python" for i in profs]
    # return ' с опытом Python'.join(list(map(str, profs))) #с использованием map


@print_result
def f4(profs):
    l_of_salaries = [random.randrange(100000, 200000) for i in range(len(profs))]
    return ["{}, зарплата {}".format(x, y) for x, y in zip(profs, l_of_salaries)]


if __name__ == "__main__":
    with Foo():
        with open("data_light.json", encoding="utf-8") as file:
            data = json.load(file)

        f4(
            f3(
                f2(
                    f1([1, 2, 3])
                )
            )
        )
