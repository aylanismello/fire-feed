require 'soundcloud'
require 'dotenv'
require 'byebug'
Dotenv.load

# create a client object with your app credentials
client = Soundcloud.new(:client_id => ENV['SOUNDCLOUD_CLIENT'])

# find all sounds of buskers licensed under 'creative commons share alike'
tracks = client.get('/users', :q => 'majestic casual')
print tracks.first.id
