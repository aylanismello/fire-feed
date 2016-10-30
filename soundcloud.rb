require 'soundcloud'
require 'dotenv'
Dotenv.load

user = ARGV[0]
# create a client object with your app credentials
client = Soundcloud.new(:client_id => ENV['SOUNDCLOUD_CLIENT'])

# find all sounds of buskers licensed under 'creative commons share alike'
tracks = client.get('/users', :q => user)
print tracks.first.id
