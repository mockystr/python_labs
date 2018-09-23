from .geom_figure import Figure
from .figure_color import FColor


class Rectangle(Figure):
    def __init__(self, w, h, color):
        self.width = w
        self.height = h
        self.color = FColor(color)

    def area(self):
        return self.width * self.height

    def __repr__(self):
        return "width : {}, height: {}, color: {}; area: {}".format(
            self.width,
            self.height,
            self.color.color,
            self.area())
