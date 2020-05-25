qlmanage: p requires at least one file argument
Usage: qlmanage [OPTIONS] path...
-h Display this help
-r Force reloading Generators list
-r cache Reset thumbnail disk cache
-m [name ...] Display statistics about quicklookd. Stats names:
_ plugins Show the generators list
_ server Show quicklookd life information
_ memory Show quicklookd memory consumption
_ burst Show statistics about the last burst
_ threads Show concurrent accesses stats
_ other Show other information about quicklookd
-d debugLevel Integer between 1-4
-p Compute previews of the documents
-t Compute thumbnails of the documents
-x Use quicklookd (remote computation)
-i Compute thumbnail in icon mode
-s size Size for the thumbnail
-f factor Scale factor for the thumbnail
-F factor Scale factor for the thumbnail, draw downscaled and compare to 1x
-z Display generation performance info (don't display thumbnails)
-o dir Output result in dir (don't display thumbnails or previews)
-c contentType Force the content type used for the documents
-g generator Force the generator to use
