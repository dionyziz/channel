from random import randrange

# O(k * polylog(candidate))

def is_prime(candidate, k = 20):
    if candidate < 10:
        return candidate in [2, 3, 5, 7]

    for i in range(k):
        a = randrange(2, candidate - 2)
        res = pow(a, candidate - 1, candidate)
        if res != 1:
            return False
    return True

# A Carmichael number - a Fermat liar
if is_prime(935794081):
    print 'Yes'
else:
    print 'No'
