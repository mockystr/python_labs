class Unique:
    def __init__(self, l, ignore_case=False):
        self.data = self.get_unique_list(data, ignore_case)
        self.n = len(self.data)
        self.i = 0

    def __iter__(self):
        return self

    # @staticmethod
    # def get_unique_list(l, ignore_case):
    #     if ignore_case:
    #         return list(set([i.lower() for i in l]))
    #     else:
    #         return list(set(l))

    @staticmethod
    def get_unique_list(l, ignore_case):
        unique_list = []

        if ignore_case:
            l = [i.lower() for i in l]

        for el in l:
            if el not in unique_list:
                unique_list.append(el)
        return unique_list

    def __next__(self):
        if self.i < self.n:
            ret = self.data[self.i]
            self.i += 1
            return ret
        else:
            raise StopIteration()


if __name__ == "__main__":
    data = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2]
    x = Unique(data)
    print([i for i in x])

    data = ['a', 'A', 'b', 'B']
    x = Unique(data, ignore_case=True)
    print([i for i in x])