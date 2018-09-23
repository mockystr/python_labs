class FColor:
    def __init__(self, color):
        self._color = color

    @property
    def color(self):
        return self._color

    @color.setter
    def color(self, c):
        self._color = c

    @color.deleter
    def color(self):
        del self.color