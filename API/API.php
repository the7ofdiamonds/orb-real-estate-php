<?php

namespace ORB\Real_Estate\API;

class API
{
  public function __construct()
  {
    $realEstateAPI = new RealEstate();


    register_rest_route('orb/v1', '/real-estate/add', array(
      'methods' => 'POST',
      'callback' => array($realEstateAPI, 'add'),
      'permission_callback' => '__return_true',
    ));

    register_rest_route('orb/v1', '/real-estate/class/(?P<class>[a-zA-Z0-9-]+)', array(
      'methods' => 'POST',
      'callback' => array($realEstateAPI, 'search'),
      'permission_callback' => '__return_true',
    ));

    register_rest_route('orb/v1', '/real-estate/search', array(
      'methods' => 'POST',
      'callback' => array($realEstateAPI, 'search'),
      'permission_callback' => '__return_true',
    ));

    register_rest_route('orb/v1', '/real-estate/apn/(?P<apn>[a-zA-Z0-9-]+)', array(
      'methods' => 'GET',
      'callback' => array($realEstateAPI, 'byAPN'),
      'permission_callback' => '__return_true',
    ));

    register_rest_route('orb/v1', '/real-estate/id/(?P<id>[a-zA-Z0-9-]+)', array(
      'methods' => 'GET',
      'callback' => array($realEstateAPI, 'byID'),
      'permission_callback' => '__return_true',
    ));
  }
}
