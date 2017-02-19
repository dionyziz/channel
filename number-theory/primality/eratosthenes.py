from math import sqrt

# Omega(sqrt(n)) = Omega(n^(1/2)) = Omega((2^c)^(1/2))

def is_prime(n):
    is_prime = (n + 1) * [True]

    for candidate in range(2, int(sqrt(n)) + 1):
        if is_prime[candidate]:
            for witness in range(candidate * candidate, n + 1, candidate):
                is_prime[witness] = False

    return is_prime[n]

for candidate in range(2, 100):
    if is_prime(candidate):
        print candidate
