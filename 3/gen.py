import random

goods = [
    {'title': 'Ковер', 'price': 2000, 'color': 'green'},
    {'title': 'Диван для отдыха', 'color': 'black'}
]


def field(l, *args):
    # в списке смотрим каждый словарь
    for el in l:
        # условие на количество передаваемых args
        if len(args) > 1:
            d = {}
            # идем по ключам, которые даны
            for arg in args:
                # если в словаре есть такой ключ, то вписываем его
                # во временный словарь, который потом возвращаем
                if arg in el.keys():
                    if el[arg] is not None:
                        d[arg] = el[arg]
            if d:
                yield d
        elif len(args) == 1:
            for arg in args:
                if arg in el.keys():
                    if el[arg] is not None:
                        yield el[arg]


def gen_random(min_r, max_r, amount):
    for i in range(amount):
        yield (random.randrange(min_r, max_r + 1))


if __name__ == "__main__":
    # print("field:", [i for i in field(goods, 'title', 'price')])
    print("field:", [i for i in field(goods, 'title')])
    print("gen_random result:", [i for i in gen_random(2, 7, 10)])
