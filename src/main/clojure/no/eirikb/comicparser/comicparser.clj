(ns no.eirikb.comicparser.comicparser)

(defn main [args]
   (println "Hello World!")
     (println "Java main called clojure function with args: "
           (apply str (interpose " " args))))
