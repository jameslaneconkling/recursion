; PRIMITIVES
; =========================
;   * three primitive types: atoms, lists, booleans
;   * three primitive boolean functions: null?, eq?, atom?,
;   * three primitive list functions: car, cdr, cons
;   * conditionals: cond/else
;   * and additionals for stuff like math:
;     * number type (subtype of atom)
;     * tuple type (list of only numbers, subtype of lists)
;     * zero?
;     * add1, sub1

; S-expression: atom, list

; atom: turkey

; list: (turkey sandwich)
;   (quote()) = ()

; null?: (null? list)
;   JS: (arr) => !!arr.length;
;   EX:
(null? (quote())) = #t

; eq?: (eq? atom atom)
;   JS: (val, val) => val === val;
;   EX:
(eq? a b) = #f

; atom?: (atom? S-expression)
;   EX:
(atom? (quote())) = #f

; car: (car list)
;   JS: (arr) => arr[0];
;   EX:
(car (a b c)) = a

; cdr: (cdr list)
;   JS: (arr) => arr.slice(1, arr.length);
;   EX:
(cdr (a b c)) = (b c)

; cons: (cons S-expression list)
;   JS: (val, arr) => [].concat(val, arr)
;   EX:
(cons a (b c)) = (a b c)

; cond else
;   EX:
(cond
  ((eq? (car l) first) #t)
  (else #f))

; or and: (or S-expression S-expression)
;   EX:
(or (null? (a b c)) xyz) = xyz
(or (eq? z z) xyz) = #t

; define:
;   JS: var l = ['a', 'b', 'c'];
;   EX:
(define l (a b c))

; lambda: (lambda (l) S-expression)
;   EX:
(lambda (a b)
  (cons (car a)(
    (cons (car b) (quote())))))



; LIST FUNCTIONS
; =========================
(define isFlatArray?
  (lambda (l)
    (cond
      ((null? l) #t)
      ((atom? (car l)) (isFlatArray? (cdr l)))
      (else #f))))

(define isMemberOf?
  (lambda (a lat)
    (cond
      ((null? lat) #f)
      (else (or (eq? (car lat) a)
                (isMemberOf? a (cdr lat)))))))

(define removeFirstMember
  (lambda (a lat)
    (cond
      ((null? lat) (quote()))
      (else (cond
        ((eq? (car lat) a) (cdr lat))
        (else (cons (car lat) (removeFirstMember a (cdr lat)))))))))
; same as
(define removeFirstMember
  (lambda (a lat)
    (cond
      ((null? lat) (quote()))
      ((eq? (car lat) a) (cdr lat))
      (else (cons (car lat) (removeFirstMember a (cdr lat)))))))

(define firstInLists
  (lambda (l)
    (cond
      ((null? l) (quote()))
      (else (cons (car (car l)) (firstInLists (cdr l)))))))

(define insertAfterVal
  (lambda (new existing lat)
    (cond
      ((null? lat) (quote()))
      ((eq? (car lat) existing) (cons existing (cons new (cdr lat))))
      (else (cons (car lat) (insertAfterVal new existing (cdr lat)))))))

(define insertBeforeVal
  (lambda (new existing lat)
    (cond
      ((null? lat) (quote()))
      ((eq? (car lat) existing) (cons new lat))
      (else (cons (car lat) (insertBeforeVal new existing (cdr lat)))))))

(define substituteFirst
  (lambda (new old lat)
    (cond
      ((null? lat) (quote()))
      ((eq? (car lat) old) (cons new (cdr lat)))
      (else (cons (car lat) (substituteFirst new old (cdr lat)))))))

(define substituteFirstOfEither
  (lambda (new old1 old2 lat)
    (cond
      ((null? lat) (quote()))
      ((or (eq? (car lat) old1) (eq? (car lat) old2)) (cons new (cdr lat)))
      (else (cons (car lat) (substituteFirstOfEither new old1 old2 (cdr lat)))))))

(define removeAllMembers
  (lambda (a lat)
    (cond
      ((null? lat) (quote()))
      ((eq? (car lat) a) (removeAllMembers a (cdr lat)))
      (else (cons (car lat) (removeAllMembers a (cdr lat)))))))

(define insertAfterAllVals
  (lambda (new existing lat)
    (cond
      ((null? lat) (quote()))
      ((eq? (car lat) existing) (cons existing (cons new (insertAfterAllVals new existing (cdr lat)))))
      (else (cons (car lat) (insertAfterAllVals new existing (cdr lat)))))))

(define insertBeforeAllVals
  (lambda (new existing lat)
    (cond
      ((null? lat) (quote()))
      ((eq? (car lat) existing) (cons new (cons existing (insertBeforeAllVals new existing (cdr lat)))))
      (else (cons (car lat) (insertBeforeAllVals new existing (cdr lat)))))))

(define substituteAll
  (lambda (new old lat)
    (cond
      ((null? lat) (quote()))
      ((eq? (car lat) old) (cons new (substituteAll new old (cdr lat))))
      (else (cons (car lat) (substituteAll new old (cdr lat)))))))


; MATH FUNCTIONS
; =========================
(define add
  (lambda (num1, num2))
    (cond
      ((zero? num2) num1)
      (else (add1 (add num1 (sub1 num2))))))
; or, make tail recursive by adding while recusing downwards, rather than adding while returning upwards
(define add
  (lambda (num1, num2))
    (cond
      ((zero? num2) num1)
      (else (add (add1 num1) (sub1 num2)))))

(define subtract
  (lambda (num1, num2))
    (cond
      ((zero? num2) num1)
      (else (subtract (sub1 num1) (sub1 num2)))))

(define multiply
  (lambda (num1, num2))
    (cond
      ((zero? num2) 0)
      (else (multiply (add num1 num1) (sub1 num2)))))

(define zipSum
  (lambda (tup1 tup2)
    (cond
      ((and (null? tup1) (null? tup2)) (quote()))
      (else (cons (add (car tup1) (add car tup2)) (zipSum (cdr tup1) (cdr tup2)))))))
; and, to allow zipSumming tuples of different lengths
(define zipSum
  (lambda (tup1 tup2)
    (cond
      ((null? tup1) tup2))
      ((null? tup2) tup1))
      (else (cons (add (car tup1) (add car tup2)) (zipSum (cdr tup1) (cdr tup2)))))))





; COMMANDMENTS
; =========================
;
; 1) When recurring on a list of atoms, lat, ask two questions about it: (null? lat) and else
;    When recurring on a number, n, ask two questions about it: (zero? n) and else
;
; 2) Use cons to build lists
;
; 3) When building a list, describe the first typical element and then cons it onto the natural recursion
;      * not tail recursive?  the `(else (cons (car lat) (recursiveCall ... (cdr lat))))`, or "shift and concatenate to the result of the recursive call on remaining results" seems to prevent tail recursion
;
; 4) Always change at least one argument while recurring.
;    It must be changed to be closer to termination.
;    The changing argument must be tested in the termination condition
;      When using cdr, test termination with null?
;      When using sub1, test termination with zero?
;
; 5) When building a value with `add`, always use 0 for the value of the terminating line, for adding 0 does not change the value of an addition
;    When building a value with `multiply`, always use 1 for the value of the terminating line, for multiplying by 1 does not change the value of a multiplication
;    When building a value with `cons`, always consider (quote()) for the value of the terminating line
