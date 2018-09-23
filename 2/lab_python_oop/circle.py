from .geom_figure import Figure
from .figure_color import FColor
from math import pi


class Circle(Figure):
    def __init__(self, r, color):
        self.radius = r
        self.color = FColor(color)

    def area(self):
        return pi * self.radius * self.radius

    def __repr__(self):
        return "radius: {}, color: {}; area: {}".format(
            self.radius,
            self.color.color,
            self.area())
