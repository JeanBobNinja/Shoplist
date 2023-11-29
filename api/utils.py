def output(type):
    def _output(func):
        def wrapper(* args, **kwargs):
            ret = func(*args, **kwargs)

            if type is list:
                res = []
                for item in ret:
                    res.append({k: item[k] for k in item.keys()})
                return res

            if type is dict:
                return {k: ret[k] for k in ret.keys()}

        return wrapper

    return _output