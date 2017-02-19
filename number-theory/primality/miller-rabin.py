from random import randrange

# O(k * polylog(p))
def is_prime(p, k=20):
    """Determines whether number p is a prime number.
       Works in polynomial complexity.
       Parameterized by accuracy factor k.
       Returns False is composite, or True if probably prime.
       Probability of mistake in case of compositeness: 4^(-k)
       (which is negligible in k)."""
    phi = p - 1
    d = phi
    r = 0

    while d % 2 == 0:
        d /= 2
        r += 1

    for i in range(k):
        a = randrange(2, p - 2)
        exp = pow(a, d, p)
        if exp == 1 or exp == p - 1:
            continue
        for j in range(r - 1):
            exp = pow(exp, 2, p)
            if exp == 1:
                return False
            if exp == p - 1:
                break
        else:
            return False
    return True

for candidate in range(5, 100):
    if is_prime(candidate):
        print candidate
