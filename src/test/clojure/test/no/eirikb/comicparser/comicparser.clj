(ns test.no.eirikb.comicparser.comicparser
  (:use clojure.test)
  (:use no.eirikb.comicparser.comicparser)
  (:import (javax.imageio ImageIO)
           (java.io File)))

;; ref http://nakkaya.com/2009/11/18/unit-testing-in-clojure/
(defmacro with-private-fns [[ns fns] & tests]
  "Refers private fns from ns and runs tests in context."
  `(let ~(reduce #(conj %1 %2 `(ns-resolve '~ns '~%2)) [] fns)
     ~@tests))

(defn get-argb [img cord]
  (let [[x y] cord
        clr (.getRGB img x y)]
    [(bit-and (bit-shift-right clr 24) 0xff)
     (bit-and (bit-shift-right clr 16) 0xff)
     (bit-and (bit-shift-right clr 8) 0xff)
     (bit-and clr 0xff)]))

(defn get-pixels [img]
  (map #(get-argb img %) 
       (for [x (range (.getWidth img)) 
             y (range (.getHeight img))] 
         [x y])))

(def image 
  (ImageIO/read (File. "testdata/caroling.png")))

(def pixels
  (get-pixels image))

(deftest test-parse
         (parse pixels (.getWidth image) (.getHeight image)))

(with-private-fns [no.eirikb.comicparser.comicparser [calculate-base-color]]
                  (deftest test-calculate-base-color
                           (calculate-base-color pixels (.getWidth image) (.getHeight image))))

(run-tests)
