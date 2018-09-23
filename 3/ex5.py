import time


class Foo:
    def __init__(self):
        self.script_time = 0

    def __enter__(self):
        self.script_time = time.time()

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(time.time() - self.script_time)
        self.script_time = 0


with Foo():
    time.sleep(5.5)
