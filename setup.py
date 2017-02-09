from setuptools import setup
from os import path
from codecs import open

root_dir = path.abspath(path.dirname(__file__))

with open( path.join( root_dir, 'README.rst' ), encoding = 'utf-8' ) as f:
    long_description = f.read()


setup(
    name='Flask-DStore',
    version='0.1.1',
    url = 'https://github.com/MarkLark/flask-dstore',
    license='MIT',
    author='Mark Pittaway',
    author_email='mark.pittaway@mlit.net.au',
    description='DStore Web API and JS Client using FLask',
    long_description=long_description,
    packages=['flask_dstore'],
    zip_safe=False,
    include_package_data=True,
    platforms='any',
    install_requires=[
        'Flask>=0.10',
        'dstore>=0.1.1',
        'dstore-acl>=0.1.1',
        'pathlib'
    ],
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Environment :: Web Environment',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Topic :: Database :: Front-Ends'
    ]
)
