(ns test.no.eirikb.comicparser.comicparser
  (:use clojure.test)
  (:use no.eirikb.comicparser.comicparser)
  (:import (javax.imageio ImageIO)
           (java.io File)))

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
             y (range (.getHeight img))] [x y])))

(def image 
  (ImageIO/read (File. "testdata/caroling.png")))

(def pixels
  (get-pixels image))

(deftest test-parse
         (parse pixels (.getWidth image) (.getHeight image)))

(run-tests)
