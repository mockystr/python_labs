from .rectangle import Rectangle


class Square(Rectangle):
    def __init__(self, w, color):
        super().__init__(w, w, color)

    def __repr__(self):
        return "width : {}, color: {}; area: {}".format(
            self.width,
            self.color.color,
            self.area())