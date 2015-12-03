# Elasticsearch
* Assumes a Vagrant box
* Uses https://github.com/Traackr/ansible-elasticsearch as a base

* The ssh port might change in local.yml depending on the Vagrant configuration

* To run the ansible setup
```
ansible-playbook local-playbook.yml -e user=vagrant
```
