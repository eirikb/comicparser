(ns no.eirikb.comicparser.test.comicparser
  (:use clojure.test))

(defn add2 [x] 
  (+ x 2))

(deftest test-adder
         (is (= 24  (add2 22))))
