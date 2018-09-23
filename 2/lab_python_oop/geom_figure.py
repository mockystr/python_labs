from abc import ABCMeta, abstractmethod


class Figure(object):
    __metaclass__ = ABCMeta

    @abstractmethod
    def area(self):
        pass
